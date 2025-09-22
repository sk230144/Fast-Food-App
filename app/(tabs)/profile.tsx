import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import useAuthStore from '@/store/auth.store';
import CustomHeader from '@/components/CustomHeader';

const AVATAR_SIZE = 88;

const Profile = () => {
  const { user, logout } = useAuthStore();

  // Example shape based on your console.log
  const {
    name = 'User',
    email = 'user@example.com',
    phone = '+1 555 123 4567',
    avatar,
    addressHome = '123 Main Street, Springfield, IL 62704',
    addressWork = '221B Rose Street, Foodville, FL 12345',
  } = mapUser(user);

  const onEditProfile = () => {
    // navigate to edit screen or open modal
    // e.g., router.push('/edit-profile')
  };

  const onLogout = async () => {
    try {
      await logout?.();
      // optionally navigate to auth screen
    } catch (e) {
      console.warn('Logout failed', e);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <CustomHeader title="Profile" />
        {/* Avatar + edit */}
        <View style={styles.avatarWrap}>
          <Image
            source={{
              uri:
                avatar ??
                `https://syd.cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(
                  name
                )}`,
            }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editBadge} onPress={onEditProfile} activeOpacity={0.8}>
            <MaterialIcons name="edit" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <InfoRow
            icon={
              <Ionicons name="person-outline" size={20} color="#FC7A1E" />
            }
            label="Full Name"
            value={name}
          />
          <Separator />
          <InfoRow
            icon={<Ionicons name="mail-outline" size={20} color="#FC7A1E" />}
            label="Email"
            value={email}
          />
          <Separator />
          <InfoRow
            icon={<Ionicons name="call-outline" size={20} color="#FC7A1E" />}
            label="Phone number"
            value={phone}
          />
          <Separator />
          <InfoRow
            icon={<Entypo name="location-pin" size={20} color="#FC7A1E" />}
            label="Address 1 - (Home)"
            value={addressHome}
          />
          <Separator />
          <InfoRow
            icon={<Entypo name="location-pin" size={20} color="#FC7A1E" />}
            label="Address 2 - (Work)"
            value={addressWork}
          />
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryBtn} onPress={onEditProfile} activeOpacity={0.9}>
            <Text style={styles.primaryBtnText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dangerBtn} onPress={onLogout} activeOpacity={0.9}>
            <View style={styles.logoutRow}>
              <Ionicons name="log-out-outline" size={18} color="#E03B3B" />
              <Text style={styles.dangerBtnText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.leftIconWrap}>
        <View style={styles.iconCircle}>{icon}</View>
      </View>
      <View style={styles.rightText}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

/**
 * Map your store user object → UI fields.
 * Adjust this to your real shape once you have profile data.
 */
function mapUser(raw: any) {
  if (!raw) return {};
  return {
    name: raw?.name ?? raw?.fullName ?? 'Saurabh Tiwari',
    email: raw?.email ?? 'risabht043@gmail.com',
    phone: raw?.phone ?? '+1 555 123 4567',
    avatar: raw?.avatar,
    addressHome:
      raw?.addresses?.home ??
      '123 Main Street, Springfield, IL 62704',
    addressWork:
      raw?.addresses?.work ??
      '221B Rose Street, Foodville, FL 12345',
  };
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 28,
    alignItems: 'center',
  },
  avatarWrap: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginTop: 4,
    marginBottom: 14,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: AVATAR_SIZE / 2,
  },
  editBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FC7A1E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FC7A1E',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  leftIconWrap: {
    width: 44,
    alignItems: 'center',
    paddingTop: 2,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF3EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightText: {
    flex: 1,
    paddingLeft: 8,
  },
  label: {
    color: '#7C7C7C',
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: '#212121',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 4,
  },
  actions: {
    width: '100%',
    marginTop: 16,
    gap: 12,
  },
  primaryBtn: {
    backgroundColor: '#FFF3EA',
    borderWidth: 1,
    borderColor: '#FFC58F',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#FC7A1E',
    fontWeight: '700',
    fontSize: 15,
  },
  dangerBtn: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#F7C4C4',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dangerBtnText: {
    color: '#E03B3B',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default Profile;
